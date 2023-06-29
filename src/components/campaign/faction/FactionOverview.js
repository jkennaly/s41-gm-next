import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FactionTypeForm } from './FactionTypeForm';


const FactionOverview = ({  }) => {



    return (
<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
Factions Overview
<FactionTypeForm />
</div>

)
}

export default FactionOverview;