import React from 'react';
import { IntegerInput, StringInput, DateTimeInput, SelectInput } from '../formInputs/FormInputs';
import { addModel } from '../../store/actions/models';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';


export default function GameCreateForm({ schema, route }) {
  const { properties, required } = schema;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //convert the form data to a JSON object
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    //dispatch the addModel action
    const modelName = schema.title.toLowerCase()
    console.log("model", modelName)
    const { payload } = await dispatch(addModel({modelData: formDataObj, modelName}, schema.title.toLowerCase()));
    if(payload && payload.id) {
      //redirect to the game page
      router.push(`/${modelName}/${payload.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            {Object.keys(properties)
                .filter(k => properties[k].generator === 'user')
                .map((key) => {
              const property = properties[key];
              const isRequired = required.includes(key);

              switch(property.type) {
                case 'integer':
                  return (
                    <IntegerInput
                      key={key}
                      name={key}
                      label={property.description}
                      description={property.description}
                      required={isRequired}
                    />
                  );                  
                  case 'string':
                    if (property.enum) {
                        return (
                        <SelectInput
                            key={key}
                            name={key}
                            label={property.description}
                            description={property.description}
                            options={property.enum}
                            required={isRequired}
                        />
                        );
                    } else if(property.format === 'date-time') {
                        return (
                            <DateTimeInput
                              key={key}
                              name={key}
                              label={property.description}
                              description={property.description}
                              required={isRequired}
                            />
                          );
                    } else {
                        return (
                        <StringInput
                            key={key}
                            name={key}
                            label={property.description}
                            description={property.description}
                            required={isRequired}
                        />
                        );
                    }

                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
