import React from 'react';
import { IntegerInput, StringInput, DateTimeInput, SelectInput } from '../formInputs/FormInputs';
import { addModel } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Games",
    "description": "A JSON representation of the Games model.",
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "minimum": 1,
        "description": "The unique identifier for a game.",
        "generator": "system"
      },
      "name": {
        "type": "string",
        "description": "The name of the game.",
        "minLength": 1,
        "generator": "user"
      },
      "status": {
        "type": "string",
        "description": "The status of the game.",
        "enum": ["completed", "inProgress", "upcoming"],
        "generator": "user"
      },
      "completedAt": {
        "type": "string",
        "format": "date-time",
        "description": "The date and time when the game was completed.",
        "generator": "system"
      },
      "createdAt": {
        "type": "string",
        "format": "date-time",
        "description": "The date and time when the game record was created.",
        "generator": "system"
      },
      "updatedAt": {
        "type": "string",
        "format": "date-time",
        "description": "The date and time when the game record was last updated.",
        "generator": "system"
      },
      "maxPlayers": {
        "type": "integer",
        "description": "The maximum number of players allowed in the game.",
        "minimum": 1,
        "generator": "user"
      },
      "gameLength": {
        "type": "integer",
        "description": "The length of the game in minutes.",
        "minimum": 1,
        "generator": "user"
      },
      "gameType": {
        "type": "string",
        "description": "The type of the game.",
        "minLength": 1,
        "generator": "user"
      }
    },
    "required": [
      "id",
      "name",
      "status",
      "maxPlayers",
      "gameLength",
      "gameType"
    ],
    "additionalProperties": false
  };

export default function GameCreateForm() {
  const { properties, required } = schema;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //convert the form data to a JSON object
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    //dispatch the addModel action
    const { payload } = await dispatch(addModel(formDataObj, 'games'));
    if(payload && payload.id) {
      //redirect to the game page
      router.push(`/games/${payload.id}`);
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
