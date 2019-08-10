import React from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (
  storageName,
  dataToSave,
  ...rest
) => WrappedComponent => {
  class withLocalstorage extends React.Component {
    constructor(props) {
      super(props);
      this.dataFromStorage = load(storageName);
    }

    saveData(dataToSave) {
      save(storageName, dataToSave);
    }

    render() {
      return (
        <WrappedComponent
          savedData={this.dataFromStorage}
          saveData={this.saveData}
          {...rest}
        />
      );
    }
  }
  return withLocalstorage;
};

export default withLocalstorage;
