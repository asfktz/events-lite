import React from 'react';
import { FieldArray, connect } from 'formik';
import { get } from 'lodash';

function CheckboxGroup ({ formik: { values }, renderOption, options, multi, name, ...props }) {
  return (
    <FieldArray
      name={name}
      render={({ push, remove }) => {
        const list = get(values, name, []);

        function handleChange (option, checked) {
          if (multi) {
            if (checked) {
              push(option.value);
            } else {
              const idx = list.indexOf(option.value);
              remove(idx);
            }
          } else {
            if (checked) {
              push(option.value);
            } else {
              const idx = list.indexOf(option.value);
              remove(idx);
            }
          }
        }

        return (
          <div>
            {options.map(option => {
              return (
                <div key={option.value}>
                  {renderOption({
                    label: option.label,
                    name,
                    value: option.value,
                    checked: list.includes(option.value),
                    onChange: (e) => handleChange(option, e.target.checked),
                  })}
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
}

export default connect(CheckboxGroup);
  