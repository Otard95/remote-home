export default class Argument<T> {
  
  // [choice1,choice2,choice3]:string:number:bool:NONE
  public static Parse (value_to_parse: string): Argument<any> | null {
    if (value_to_parse === 'NONE') {
      return null;
    }
    if (value_to_parse.startsWith('[')) {
      const choises: string[] = value_to_parse
                                .substring(1, value_to_parse.length - 1)
                                .split(',');
      const placeholder = 'Choose an option.';
      const value = choises[0];
      return new Argument<string> (String.name, value, placeholder, choises);
    }
    
    switch (value_to_parse) {
      case 'string':
        return new Argument<string> (String.name, '', 'Text');
      case 'number':
        return new Argument<number> (Number.name, 0);
      case 'bool':
        return new Argument<boolean> (Boolean.name, false);
    }
    
    throw new Error('Could not parse argument description. Invalid format');
  }
  
  public type: string;
  public value: T;
  public placeholder?: string;
  public choises?: T[];
  
  constructor (
    tName: string,
    initial_value: T,
    placeholder?: string | undefined,
    choises?: T[] | undefined,
  ) {
    this.type = tName;
    this.value = initial_value;
    this.placeholder = placeholder;
    this.choises = choises;
  }
  
}
