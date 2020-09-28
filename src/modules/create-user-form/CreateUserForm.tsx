import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import { Button, InputField } from 'ui';

import { Form, V } from 'utils';

import csx from './CreateUserForm.scss';

namespace CreateUserForm {
  export interface Props {
    onSubmit(credentials: any): void;
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      minWidth: 120,
      backgroundColor: '#0f183e'
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    label: {
      color: '#3381e1'
    },
    button: {
      marginTop: theme.spacing(),
      width: 110
    }
  })
);

// const BASE_CONFIG: Form.Config = [
//   { label: 'Name', fns: [V.req] },
//   { label: 'Role', fns: [V.req] },
//   { label: 'Skill', fns: [V.req] }
// ];

const BASE_CONFIG: Form.Config = [{ label: 'Name' }, { label: 'Role' }, { label: 'Skill' }];

const [NAME, ROLE, SKILL] = [0, 1, 2];

const CreateUserForm = ({ onSubmit }: CreateUserForm.Props) => {
  const classes = useStyles();
  const [role, setRole] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [{ fields, dirty, invalid }, change, _, submit] = Form.useManager(BASE_CONFIG);

  const handleRole = (event: React.ChangeEvent<{ value }>) => {
    setRole(event.target.value);
    fields[ROLE].value = event.target.value;
  };

  const handleSkill = (event: React.ChangeEvent<{ value }>) => {
    setSkill(event.target.value);
    fields[SKILL].value = event.target.value;
  };

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
        <form className={csx.form} onSubmit={handleSubmit}>
          <InputField
            data-idx={NAME}
            label={`${BASE_CONFIG[NAME].label}`}
            placeholder={`${BASE_CONFIG[NAME].label}...`}
            error={dirty ? fields[NAME].error : ''}
            value={fields[NAME].value}
            onChange={change}
          />

          <FormControl className={classes.formControl} variant="filled">
            <InputLabel className={classes.label} id="demo-simple-select-filled-label">
              Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={role}
              onChange={handleRole}
            >
              <MenuItem value={'Forward'}>Forward</MenuItem>
              <MenuItem value={'Midfielder'}>Midfielder</MenuItem>
              <MenuItem value={'Defender'}>Defender</MenuItem>
              <MenuItem value={'Goalkeeper '}>Goalkeeper</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl} variant="filled">
            <InputLabel className={classes.label} id="demo-simple-select-filled-label">
              Skill
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={skill}
              onChange={handleSkill}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>

          <Button className={classes.button} type="submit" disabled={dirty && invalid}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateUserForm;
