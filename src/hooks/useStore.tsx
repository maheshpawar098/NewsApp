import React from 'react';
import { appContext } from 'context';

const useStore = () => React.useContext(appContext);


export {
    useStore
}