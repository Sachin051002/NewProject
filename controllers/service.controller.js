const db = require("../config/dbConfig");
const path = require('path');
const fs = require('fs');
const userModel = db.user;



exports.services = async (req, res) => {
    let services = [
        {
            "Electrical service": [
                "Electrical-Ex maintenance",
                "Thermography inspections",
                "Generator installation",
                "UPS systems",
                "Breaker test (primary and secondary)",
                "Testing and cleaning of switchboards",
                "Thermography",
                "Battery capacity test of UPS systems",
                "EX distribution boards and control panels",
                "Check, test and cleaning of Fire and Gas detection systems",
                "High voltage switchboards and cable installation",
                "Level monitoring systems"
            ]
        },
        {
            "Mechanical service": [
                "Steel work",
                "Rig interface",
                "Deck extension and walkways",
                "Piping LP/HP, Plastic piping",
                "Scaffolding and rigging",
                "Special welding repairs",
                "Leg repairs and replacement of bracings",
                "General design and fabrication",
                "Thrusters’ replacement",
                "Drag chain upgrade or modification",
                "Leg inspection / repair",
                "Lifeboat upgrade, installation and commissioning"
            ]
        }

        {
            
        }
    ]
}