const contactModel=require("../model/contactModel")

function validateName($name) {
    var nameReg = /^[A-Za-z]*$/;
    if (!nameReg.test($name)) { return false;
    } else { return true;
    }
}






const createContact = async function (req, res) {
    try {
        let contactData = req.body;

        if (!contactData. first_name) return res.status(400).send({ status: false, msg: "FirstName Is Mandatory" });
        let fname = validateName(contactData.fname);
        if (!fname) return res.status(400).send({ status: false, msg: "Invalid First Name" });


        if (!contactData.last_name) return res.status(400).send({ status: false, msg: "LastName Is Mandatory" });
        let lname = validateName(contactData.lname);
        if (!lname) return res.status(400).send({ status: false, msg: "Invalid Last Name" });

       

        if (!contactData.email) return res.status(400).send({ status: false, msg: "email is Mandatory" })


        if (!contactData. mobile_number) return res.status(400).send({ status: false, msg: "mobile number is Mandatory" })

        if (!contactData.data_store) return res.status(400).send({ status: false, msg: "Data is Mandatory" })


        let savedData = await contactModel.create(contactData);
        return res.status(201).send({ status: true,message:"Contact is Created Successfully", data: savedData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





const getContact = async function (req, res) {
    try {
        let contactId = req.params.contactId;


        let data = await contactModel.findById(contactId);
        if (!data) {
            return res.status(404).send({ status: false, message: "id does not exist" });
        }
     

        let respondData = {
            _id: data._id,
            first_name: data.first_name,
            last_name: data.last_name,
            email:data.email,
            mobile_number: data.mobile_number
            
        }

        return res.status(200).send({ status: true, message: "Contact", data: respondData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



const deleteContact = async function (req, res) {

    try {
        let contactId = req.params.contactId

        const contact = await contactModel.findOne({ _id: contactId, isDeleted: false })
        if (!contact) {
            return res.status(404).send({ status: false, message: "contact does not found" })
        }

        await contactModel.updateOne({ _id: contactId }, { $set: { isDeleted: true, deletedAt: new Date() } })
        return res.status(200).send({ status: true, message: "contact deleted successfully" })
    }
    catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}


const updateContact = async function (req, res) {

    try {
        const data = req.body
        let contactId = req.params.contactId

        const {first_name, last_name, email, mobile_number, data_store} = data
        let obj = {}

        if (first_name) obj.first_name=first_name
        if (last_name) obj.last_name = last_name
        if (email) obj.email =email
        if (mobile_number) obj.mobile_number = mobile_number
        if (data_store) obj.data_store =data_store

       

    

        let contact = await contactModel.findOne({ _id: contactId,  isDeleted : false })
        if (!contact) return res.status(404).send({ status: false, message: "contact does not found" })

 

        const updateContact = await contactModel.findOneAndUpdate({ _id: contactId}, { $set: obj }, { new: true })

        return res.status(200).send({ status: true, message: "Student update is successful", data: updateContact })

    }
    catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }
}



module.exports.deleteContact=deleteContact
module.exports.createContact=createContact
module.exports.getContact=getContact
module.exports.updateContact=updateContact