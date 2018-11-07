export default class Argument<T> {
  
  // [choice1,choice2,choice3]:string:number:bool:NONE
  public static Parse (value_to_parse: string): Argument<any> {
    if (value_to_parse === 'NONE') {
      return new Argument<string>('NONE', '');
    }
    
    let match: RegExpMatchArray | null = value_to_parse.match(/\{([\w+ ]+)\}/g);
    if (match) {
      value_to_parse.replace(/\{([\w+ ]+)\}/, '');
    } else {
      match = [];
    }
    if (value_to_parse.startsWith('[')) {
      const choises: string[] = value_to_parse
                                .substring(1, value_to_parse.length - 1)
                                .split(',');
      const placeholder = match[1] || 'Choose an option';
      const value = choises[0];
      return new Argument<string> (String.name, value, placeholder, choises);
    }
    
    switch (value_to_parse) {
      case 'string':
        return new Argument<string> (String.name, '', match[1] || 'Text');
      case 'number':
        return new Argument<number> (Number.name, 0, match[1 || '']);
      case 'bool':
        return new Argument<boolean>(Boolean.name, false, match[1] || '');
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
    placeholder?: string,
    choises?: T[],
  ) {
    this.type = tName;
    this.value = initial_value;
    this.placeholder = placeholder;
    this.choises = choises;
  }
  
}
