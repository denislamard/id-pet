import validator from "validator";

export const validationData = (rules, data) => {
    let errors = [];
    Object.keys(data).forEach(field => {
        if (rules.hasOwnProperty(field)) {
            let value = data[field];
            if (rules[field].required) {
                switch (rules[field].type) {
                    case 'email':
                        if (value === null || !validator.isEmail(value)) {
                            errors.push(rules[field].msg);
                        }
                        break;
                    case 'date':
                        if (value === null || !validator.isDate(value)) {
                            errors.push(rules[field].msg);
                        }
                        break;
                    case 'boolean':
                        if (typeof value === 'boolean') {
                            if (!value) {
                                errors.push(rules[field].msg);
                            }
                        }
                        if (typeof value === 'string') {
                            if (value === 'false') {
                                errors.push(rules[field].msg);
                            }
                        }
                        break
                    default:
                        if (value === null || validator.isEmpty(value)) {
                            errors.push(rules[field].msg);
                        }
                }
            }
        }
    });
    return errors;
}
