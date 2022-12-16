import mongoose from "mongoose";

const providerSchema=mongoose.Schema({
    name:{type: String, required: true},
    cost:{type: Number, required: true},
    sales:{type: Number, default:0},
    response_time:{type: Number, required: true},
    network_bandwidth:{type: Number, required: true},
    available_VM:{type: Number},
    total_VM:{type: Number,required:true},
    security_management:{type: String},
    flexibility:{type: String},
    email:{type: String, required: true, index: { unique: true }},
    password:{type: String, required: true},
    id:{type: String},
    
});


var ProviderRegister=mongoose.model("ProviderRegister",providerSchema);
export default ProviderRegister;