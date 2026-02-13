import React from 'react';
import { FaChild, FaSmoking, FaPaw } from 'react-icons/fa';
import { MdChildCare, MdSmokeFree, MdPets } from 'react-icons/md';

const BookingPropertyRules = ({ 
  rules = {
    childrenAllowed: true,
    smokingAllowed: false,
    petsAllowed: true
  }
}) => {
  const rulesList = [
    {
      icon: rules.childrenAllowed ? <MdChildCare className="text-green-600" /> : <MdChildCare className="text-red-600" />,
      label: "Children Allowed",
      allowed: rules.childrenAllowed,
      bgColor: rules.childrenAllowed ? 'bg-green-50' : 'bg-red-50',
      borderColor: rules.childrenAllowed ? 'border-green-200' : 'border-red-200'
    },
    {
      icon: rules.smokingAllowed ? <FaSmoking className="text-green-600" /> : <MdSmokeFree className="text-red-600" />,
      label: "Smoking Allowed",
      allowed: rules.smokingAllowed,
      bgColor: rules.smokingAllowed ? 'bg-green-50' : 'bg-red-50',
      borderColor: rules.smokingAllowed ? 'border-green-200' : 'border-red-200'
    },
    {
      icon: rules.petsAllowed ? <MdPets className="text-green-600" /> : <MdPets className="text-red-600" />,
      label: "Pets Allowed",
      allowed: rules.petsAllowed,
      bgColor: rules.petsAllowed ? 'bg-green-50' : 'bg-red-50',
      borderColor: rules.petsAllowed ? 'border-green-200' : 'border-red-200'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-[#222222] mb-6">
        Property Rules
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {rulesList.map((rule, index) => (
          <div 
            key={index}
            className={`${rule.bgColor} ${rule.borderColor} border rounded-lg p-4 flex items-center gap-3 transition-all duration-200 hover:shadow-sm`}
          >
            <div className="flex-shrink-0 text-xl">
              {rule.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-[#222222]">{rule.label}</p>
              <p className={`text-xs ${rule.allowed ? 'text-green-700' : 'text-red-700'}`}>
                {rule.allowed ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPropertyRules;
