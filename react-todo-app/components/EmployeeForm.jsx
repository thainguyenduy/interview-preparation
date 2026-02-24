import { useState } from 'react';

const validators = {
    name: (value) => {
        if (!value) return 'Name is required';
        if (value.length < 4) return 'Name must be at least 4 characters';
        if (!/^[a-zA-Z]+$/.test(value))
            return 'Name can only contain alphabetical characters';
        return '';
    },
    email: (value) => {
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return 'Invalid email format';
        return '';
    },
    employeeId: (value) => {
        if (!value) return 'Employee ID is required';
        if (!/^\d{6}$/.test(value))
            return 'Employee ID must be exactly 6 digits';
        return '';
    },
    joiningDate: (value) => {
        if (!value) return 'Joining date is required';
        if (new Date(value) > new Date())
            return 'Joining date cannot be in the future';
        return '';
    },
};

function EmployeeForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        employeeId: '',
        joiningDate: '',
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (name, value) => {
        const validator = validators[name];
        return validator ? validator(value) : '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            newErrors[key] = validateField(key, formData[key]);
        });
        setErrors(newErrors);
        setTouched({ name: true, email: true, employeeId: true, joiningDate: true });

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (!hasErrors) {
            onSubmit?.(formData);
            alert('Form submitted successfully!');
        }
    };

    const isFormValid =
        Object.keys(formData).every((key) => !validateField(key, formData[key]));

    return (
        <form onSubmit={handleSubmit} className="employee-form">
            <h2>Employee Registration</h2>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter name"
                />
                {touched.name && errors.name && (
                    <span className="error">{errors.name}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter email"
                />
                {touched.email && errors.email && (
                    <span className="error">{errors.email}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="employeeId">Employee ID</label>
                <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter 6-digit ID"
                    maxLength={6}
                />
                {touched.employeeId && errors.employeeId && (
                    <span className="error">{errors.employeeId}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="joiningDate">Joining Date</label>
                <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    max={new Date().toISOString().split('T')[0]}
                />
                {touched.joiningDate && errors.joiningDate && (
                    <span className="error">{errors.joiningDate}</span>
                )}
            </div>

            <button type="submit" disabled={!isFormValid}>
                Submit
            </button>
        </form>
    );
}

export default EmployeeForm;
