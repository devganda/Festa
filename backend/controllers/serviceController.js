const {Service: ServiceModel} = require("../models/Service");

const serviceController = {
    create: async(req, res)=>{
        try {
            
            const service = {
                name: req.body.name, 
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            };

            const response = await ServiceModel.create(service);

            return res.status(201).json({response, msg:"Serviço criado com sucesso!"});

        } catch (error) {
            console.log(error);
        }
    },

    getAll: async(req, res)=>{

        try {
            const services = await ServiceModel.find();

            return res.status(200).json({services});
        } catch (error) {

            console.log(error);
        }
        
    },

    get: async (req, res) =>{
        try {
            
            const id = req.params.id;
            const services = await ServiceModel.findById(id);
            if(!services) return res.status(404).json({msg:"Serviço não encontrado!"});
            return res.status(200).json({services, msg:"sucess"});

        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req, res) =>{

        try {
            const id = req.params.id;

            const service = await ServiceModel.findById(id);
            if(!service) return res.status(404).json({msg:"Serviço não encontrado!"});

            const serviceDelete = await ServiceModel.findByIdAndDelete(id);

            return res.status(200).json({serviceDelete, msg:"Serviço deletado com sucesso!"});

        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res)=>{

        try {
            
            const id = req.params.id;

            const service = {
                name: req.body.name, 
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            };

            const serviceUpdated = await ServiceModel.findByIdAndUpdate(id, service);

            if(!serviceUpdated) return res.status(404).json({msg:"Serviço não encontrado!"});

            res.status(200).json({serviceUpdated, msg:"Serviço atualizado com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = serviceController;