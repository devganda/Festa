const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, service) =>{

    const priceSum = service.reduce((sum, service) => sum + service.price, 0);

    if(priceSum > budget) return false;

    return true;
}

const partyController = {

    create: async (req, res) =>{

        try {
            
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budgets: req.body.budgets,
                image: req.body.image,
                services: req.body.services
            };

            if(party.services && !checkPartyBudget(party.budgets, party.services)) return res.status(406).json({msg:"O seu orçamento é insuficiente!"});

            const response = await PartyModel.create(party);

            res.status(200).json({response, msg:"Festa criada com sucesso!"})

        } catch (error) {
            console.log(error);
        }

    },

    getAll: async(req, res) =>{

        try {

            const party = await PartyModel.find();

            if(!party) return res.status(200).json({msg:"Nenhuma festa foi cadastrada!"});

            return res.status(200).json({party, msg:"Success"});

        } catch (error) {
            
            console.log(error);
        }
        
    },

    get: async (req, res) => {

        try {
            
            const id = req.params.id;

            const party = await PartyModel.findById(id);

            if(!party) return res.status(404).json({msg:"Nenhuma festa foi encontrada!"});

            return res.status(200).json({party, msg:"Success"});

        } catch (error) {
            
            console.log(error);
        }
    },

    update: async (req, res) => {

        try {

            const id = req.params.id;

            const party = {

                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budgets: req.body.budgets,
                image: req.body.image,
                services: req.body.services
            }

            const updatedParty = await PartyModel.findByIdAndUpdate(id, party);

            if(!updatedParty) return res.status(404).json({message:" Ocorreu um erro! "});

            if(party.services && !checkPartyBudget(party.budgets, party.services)) return res.status(406).json({msg:"O seu orçamento é insuficiente! Não foi possível realizar a alteração!"});

            return res.status(200).json({updatedParty, msg:"Festa alterada com sucesso!"});
            
        } catch (error) {

            console.log(error);
        }
    },

    delete: async (req, res) => {

        try {

            const id = req.params.id;

            const party = await PartyModel.findById(id);
            
            if(!party) return res.status(404).json({msg:"Festa não encontrada!"});

            const deletedParty = await PartyModel.findByIdAndDelete(id);

            res.status(200).json({deletedParty, msg:"Festa deletada com sucesso!"});
            
        } catch (error) {
            
            console.log(error);
        }
    }
    
};

module.exports = partyController;