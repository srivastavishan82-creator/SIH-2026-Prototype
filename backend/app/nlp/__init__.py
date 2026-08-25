"""NLP utilities for field mapping and language handling."""

LAND_FIELD_KEYWORDS = {
    "landowner_name": ["landowner", "owner name", "name of owner", "स्वामी", "मालिक"],
    "father_husband_name": ["father", "husband", "पिता", "पति"],
    "survey_number": ["survey", "सर्वे नंबर", "सर्वे क्र"],
    "khasra_number": ["khasra", "खसरा", "खसरा न"],
    "khata_number": ["khata", "खाता"],
    "plot_area": ["area", "क्षेत्रफल", "क्षेत्र"],
    "village": ["village", "ग्राम", "गांव"],
    "tehsil": ["tehsil", "तहसील", "तालुका"],
    "district": ["district", "जिला"],
    "state": ["state", "राज्य"],
    "land_classification": ["classification", "land type", "भूमि का प्रकार"],
    "mutation_record": ["mutation", "म्यूटेशन"],
    "registration_info": ["registration", "पंजीकरण"],
}
