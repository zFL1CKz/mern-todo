const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
  async registration(email, password){
    const candidate = await UserModel.findOne({email})
    if(candidate){
      throw ApiError.BadRequest(`Пользователь ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const user = await UserModel.create({email, password: hashPassword, activationLink})
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async activate(activationLink){
    const user = await UserModel.findOne({activationLink})
    if(!user){
      throw ApiError.BadRequest('Некорректная ссылка активации')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const user = await UserModel.findOne({email})
    if(!user){
      throw ApiError.BadRequest(`Пользователь ${email} не существует`)
    }
    const isPassMatch = await bcrypt.compare(password, user.password)
    if(!isPassMatch) {
      throw ApiError.BadRequest('Неверный пароль')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const isToken = await tokenService.findToken(refreshToken)
    if(!userData || !isToken){
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async changePassword(req){
    const {password, newPassword} = req.body
    const isMatch = bcrypt.compare(password, newPassword)
    if(!isMatch) {
      throw ApiError.BadRequest('Пароли не совпадают')
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, {})

    if(!user){
      throw ApiError.BadRequest('Ошибка при изменении пароля')
    }

    const hashPassword = await bcrypt.hash(newPassword, 3)
    user.password = hashPassword
    await user.save()

    return user
  }
}

module.exports = new UserService()