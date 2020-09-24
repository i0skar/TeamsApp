import React from 'react';

import { Button, InputField } from 'ui';

import { Form, V } from 'utils';

import csx from './CreateUserForm.scss';

namespace CreateUserForm {
  export interface Props {
    onSubmit(credentials: any): void;
  }
}

const BASE_CONFIG: Form.Config = [
  { label: 'Name', fns: [V.req, V.min(2), V.max(50)] },
  { label: 'Role', fns: [V.req, V.min(2), V.max(50)] },
  { label: 'Skill', fns: [V.req, V.min(2), V.max(50)] }
];

const [NAME, ROLE, SKILL] = [0, 1, 2];

const CreateUserForm = ({ onSubmit }: CreateUserForm.Props) => {
  const [{ fields, dirty, invalid }, change, _, submit] = Form.useManager(BASE_CONFIG);

  const handleSubmit = async (e: Form.Events.Submit) => {
    if (submit(e)) {
      return;
    }

    const [{ value: name }, { value: role }, { value: skill }] = fields;

    onSubmit({ name, role, skill });
  };

  return (
    <>
      <div className={csx.createUserForm}>
        <h1 className={csx.createUserFormHeader}>Create user</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            data-idx={NAME}
            label={`${BASE_CONFIG[NAME].label}`}
            placeholder={`${BASE_CONFIG[NAME].label}...`}
            error={dirty ? fields[NAME].error : ''}
            value={fields[NAME].value}
            onChange={change}
          />

          <InputField
            data-idx={ROLE}
            label={`${BASE_CONFIG[ROLE].label}`}
            placeholder={`${BASE_CONFIG[ROLE].label}...`}
            error={dirty ? fields[ROLE].error : ''}
            value={fields[ROLE].value}
            onChange={change}
          />

          <InputField
            data-idx={SKILL}
            label={`${BASE_CONFIG[SKILL].label}`}
            placeholder={`${BASE_CONFIG[SKILL].label}...`}
            error={dirty ? fields[SKILL].error : ''}
            value={fields[SKILL].value}
            onChange={change}
          />

          <Button type="submit" disabled={dirty && invalid}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateUserForm;
