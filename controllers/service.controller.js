const db = require("../config/dbConfig");
const path = require('path');
const fs = require('fs');
const userModel = db.user;



exports.services = async (req, res) => {
    let services = [
        {
            serviceName: "Electrical Service",
            subServices: [
                { service: "Electrical-Ex maintenance" },
                { service: "Thermography inspections" },
                { service: "Generator installation" },
                { service: "UPS systems" },
                { service: "Breaker test (primary and secondary)" },
                { service: "Testing and cleaning of switchboards" },
                { service: "Thermography" },
                { service: "Battery capacity test of UPS systems" },
                { service: "EX distribution boards and control panels" },
                { service: "Check, test and cleaning of Fire and Gas detection systems" },
                { service: "High voltage switchboards and cable installation" },
                { service: "Level monitoring systems" },
                { service: "Various HMI / SCADA / DCS systems" },
                { service: "Emergency shutdown systems (ESD)" }
            ]
        },
        {
            serviceName: "Mechanical Service",
            subServices: [
                { service: "Steel work" },
                { service: "Rig interface" },
                { service: "Deck extension and walkways" },
                { service: "Piping LP/HP, Plastic piping" },
                { service: "Scaffolding and rigging" },
                { service: "Special welding repairs" },
                { service: "Leg repairs and replacement of bracings" },
                { service: "General design and fabrication" },
                { service: "Thrusters’ replacement" },
                { service: "Drag chain upgrade or modification" },
                { service: "Leg inspection / repair" },
                { service: "Lifeboat upgrade, installation and commissioning" },
                { service: "Removal and disposal of existing cranes and pedestals" },
                { service: "Cranes, pedestals, kingposts and booms" },
                { service: "Drillers cabin replacement or upgrade" },
                { service: "Handrail, Walkway and Stair Tower systems" }
            ]
        },
        {
            serviceName: "HVAC Services",
            subServices: [
                { service: "Design in 3D programs" },
                { service: "Modification of existing HVAC systems" },
                { service: "Balancing of air flows and pressure in accommodation and utility areas" },
                { service: "Balancing of flows in fluid cooling and heating systems" },
                { service: "Leakage test of ventilation ducts" },
                { service: "Troubleshooting and analysis of existing HVAC systems" },
                { service: "Cleaning of ventilation systems" },
                { service: "Fabrication and delivery of all HVAC components" },
                { service: "Onshore handling of components" },
                { service: "Pressure test of safety area" },
                { service: "Commissioning of HVAC systems (procedures, execution, client approval)" }
            ]
        },
        {
            serviceName: "ECO Services",
            subServices: [
                { service: "Drying and Ironing Clothes" },
                { service: "Dry cleaning and Laundry" },
                { service: "Bleaching" },
                { service: "Stainless Steel Polishing" },
                { service: "Entrance Glass & Windows" },
                { service: "Bathroom Sanitization" },
                { service: "Air-Duct Cleaning" },
                { service: "Lunchroom & Kitchens" },
                { service: "Hot Water Extraction Vacuuming" },
                { service: "Concrete & Tile Polishing" },
                { service: "Deep Clean Upholstery" },
                { service: "Hard to Reach Ceilings & Displays" },
                { service: "Grafitti Abatement" },
                { service: "Purification of water and air" },
                { service: "Vacuum Cleaners" },
                { service: "Washer Dryer" },
                { service: "Ovens" },
                { service: "Lighting" },
                { service: "Pressure Washing Exterior" }
            ]
        }
    ];
    

    res.status(200).send({ services })
}