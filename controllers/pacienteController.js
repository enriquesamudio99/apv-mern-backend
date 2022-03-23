import Paciente from '../models/Paciente.js';
import mongoose from 'mongoose';

const agregarPaciente = async (req, res) => {

    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;

    try {

        const pacienteAlmacenado = await paciente.save();

        return res.json(pacienteAlmacenado);

    } catch (error) {
        console.log(error);
    }

}

const obtenerPacientes = async (req, res) => {
    
    const pacientes = await Paciente.find().where("veterinario").equals(req.veterinario);

    res.json(pacientes);

}

const obtenerPaciente = async (req, res) => {

    const { id } = req.params;

    const objectId = new mongoose.Types.ObjectId(id);

    const paciente = await Paciente.findById(objectId);
    // const paciente = await Paciente.findOne({id});
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: "Accion no válida"});
    }

    if (paciente) {
        return res.json({paciente});
    }

}

const actualizarPaciente = async (req, res) => {

    const { id } = req.params;

    const objectId = new mongoose.Types.ObjectId(id);

    const paciente = await Paciente.findById(objectId);

    if (!paciente) {
        return res.status(404).json({msg: "No encontrado"});
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: "Accion no válida"});
    }

    // Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        
        const pacienteActualizado = await paciente.save();

        res.json(pacienteActualizado);

    } catch (error) {
        console.log(error);
    }
} 

const eliminarPaciente = async (req, res) => {

    const { id } = req.params;
 
    const objectId = new mongoose.Types.ObjectId(id);

    const paciente = await Paciente.findById(objectId);
 
    if (!paciente) {
        return res.status(404).json({msg: "No encontrado"});
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: "Accion no válida"});
    }

    try {  

        await paciente.deleteOne();

        res.json({msg: "Paciente eliminado"});
        
    } catch (error) {
        console.log(error);
    }

}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}