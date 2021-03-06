const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El corrreo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contrasña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

usuarioSchema.methods.toJson = function() {

    let user = this
    let userObject = user.userObject()
    delete userObject.password

    return userObject

}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} DEBE DE SER UNICO' })

module.exports = mongoose.model('usuario', usuarioSchema)