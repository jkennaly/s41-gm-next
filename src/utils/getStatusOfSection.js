const getStatusOfSection = (section) => {
    return (character) => {
      switch (section) {
        case 'PersonalDataFile': {
          const personalData = character.personalDataFile;
          const allFieldsFilled = personalData.name && personalData.species && personalData.age && personalData.title;
          const anyFieldsFilled = personalData.name || personalData.species || personalData.age || personalData.title;
  
          return allFieldsFilled ? 'completed' : anyFieldsFilled ? 'started' : 'waiting';
        }
        case 'CoreCharacteristics': {
          const coreCharacteristics = character.coreCharacteristics;
          const allFieldsFilled = coreCharacteristics.strength && coreCharacteristics.dexterity && coreCharacteristics.endurance
                                  && coreCharacteristics.intelligence && coreCharacteristics.education && coreCharacteristics.socialStanding;
          const anyFieldsFilled = coreCharacteristics.strength || coreCharacteristics.dexterity || coreCharacteristics.endurance
                                  || coreCharacteristics.intelligence || coreCharacteristics.education || coreCharacteristics.socialStanding;
  
          return allFieldsFilled ? 'completed' : anyFieldsFilled ? 'started' : 'waiting';
        }
        case 'LifePath': {
          if(getStatusOfSection('CoreCharacteristics')(character) !== 'completed') return 'disabled';
          const lifePaths = character?.lifePaths;
          const anyLifePathFilled = lifePaths?.length > 0;
          const allLifePathCompleted = lifePaths?.every(path => path.careerTerm !== null && path.preCareerTerm !== null && path.musteringOut !== null);
          return allLifePathCompleted ? 'completed' : anyLifePathFilled ? 'started' : 'waiting';
      }
        default: {
          return 'disabled';
        }
      }
    };
  };
  
  export default getStatusOfSection;
  