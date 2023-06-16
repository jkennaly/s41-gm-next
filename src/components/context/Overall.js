import React from 'react';
import Game from './Game';
import Subdivision from './Subdivision';
import Feature from './Feature';

// Assuming that you fetch data and pass it as a prop A060514-B N S Ni 0 GCE
const ContextLayout = ({ game, context, display, setDisplay }) => {
    //console.log('Overall context:', context);
    const universeFeatures = context.features
        .filter(feature => !feature.subdivisionId)
    return (
        <div className="flex flex-col bg-gray-100">
    <div className="flex items-start bg-gray-100">
    <Game game={game} context={context.universe} setDisplay={setDisplay} />
    {universeFeatures.map(feature => {
        return (
            <Feature
                parent={context.universe}
                game={game}
                universe={context.universe}
                context={context}
                feature={feature}
                setDisplay={setDisplay}
                display={display}
            />
        )
    })}

    </div>
    {context.subdivisions.map(subdivision => {
        const features = context.features
            .filter(feature => feature.subdivisionId === subdivision.id)
        return (
            <div className="flex items-start bg-gray-100">
                <Subdivision 
                    parent={context.universe}
                    game={game} 
                    universe={context.universe}
                    context={context} 
                    subdivision={subdivision} 
                    setDisplay={setDisplay} 
                    display={display}
                />
                {features.map(feature => {
                    return (
                        <Feature
                            game={game}
                            universe={context.universe}
                            context={context}
                            subdivision={subdivision}
                            feature={feature}
                            setDisplay={setDisplay}
                            display={display}
                        />
                    )
                })

                }
            </div>
        )
    })}
    </div>
  );
};

export default ContextLayout;
