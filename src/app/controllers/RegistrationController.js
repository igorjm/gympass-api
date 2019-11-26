import * as Yup from 'yup';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title']
        },
      ],
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const checkUserIdAdmin = await User.findOne({
      where: { id: req.userId, is_admin: true },
    });

    if (!checkUserIdAdmin) {
      return res.status(401).json({ error: 'User is not a admin' });
    }

    const schema = Yup.object().shape({
      start_date: Yup.dat().required(),
      student_id: Yup.number().positive().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, duration, price } = await Registration.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, duration, price } = await Registration.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }
}

export default RegistrationController;
