class ReactViewController {
  meta;
  data;
  onChange;

  constructor ({ meta, data, onChange }) {
    this.meta = meta;
    this.data = data;
    this.onChange = onChange;
  }

  setData = (data) => {
    this.data = data;

    if (this.onChange instanceof Function) {
      this.onChange(data);
    }
  };

  setProperty = (name, value, remove = false) => {
    if (typeof name === 'string') {
      const newData = {
        ...this.data,
        [name]: value
      };

      if (remove) {
        delete newData[name];
      }

      this.setData(newData);
    }
  };

  addItemToArray = (arrayName, item) => {
    if (typeof arrayName === 'string' && this.data instanceof Object) {
      const targetArray = this.data[arrayName];
      const newData = {
        ...this.data,
        [arrayName]: [
          ...(targetArray instanceof Array ? targetArray : []),
          item
        ]
      };

      this.setData(newData);
    }
  };

  removeItemFromArray = (arrayName, index) => {
    if (
      typeof arrayName === 'string' &&
      this.data instanceof Object &&
      this.data[arrayName] instanceof Array
    ) {
      const array = this.data[arrayName];
      const newArray = [];
      const newData = {
        ...this.data,
        [arrayName]: newArray
      };

      for (let i = 0; i < array.length; i++) {
        const item = array[i];

        if (i !== index) {
          newArray.push(item);
        }
      }

      this.setData(newData);
    }
  };

  changeItemInArray = (arrayName, item, index) => {
    if (
      typeof arrayName === 'string' &&
      this.data instanceof Object &&
      this.data[arrayName] instanceof Array
    ) {
      const array = this.data[arrayName];
      const newArray = [];
      const newData = {
        ...this.data,
        [arrayName]: newArray
      };

      for (let i = 0; i < array.length; i++) {
        const existingItem = array[i];

        if (i === index) {
          newArray.push(item);
        } else {
          newArray.push(existingItem);
        }
      }

      this.setData(newData);
    }
  };

  getSubControllers = () => {
    const subControllers = {};

    if (this.meta instanceof Object) {
      for (const k in this.meta) {
        if (this.meta.hasOwnProperty(k)) {
          const valueType = this.meta[k];

          if (valueType instanceof Array) {
            const scList = [];

            if (this.data instanceof Object && this.data[k] instanceof Array) {
              const targetArray = this.data[k];

              for (let i = 0; i < targetArray.length; i++) {
                const dataItem = targetArray[i];

                scList.push(new ReactViewController({
                  meta: valueType[0],
                  data: dataItem,
                  onChange: (item) => {
                    this.changeItemInArray(k, item, i);
                  }
                }));
              }
            }

            subControllers[k] = scList;
          } else if (valueType instanceof Object) {
            subControllers[k] = new ReactViewController({
              meta: valueType,
              data: this.data && this.data[k],
              onChange: (value) => {
                this.setProperty(k, value);
              }
            });
          } else {
            subControllers[k] = {
              value: this.data && this.data[k],
              onChange: (value) => {
                this.setProperty(k, value);
              }
            };
          }
        }
      }
    }

    return subControllers;
  };
}
