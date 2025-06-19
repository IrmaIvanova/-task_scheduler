import cn from 'classnames';

export const createBem = (blockName: string) => ({
  block: (modifiers?: string | Record<string, boolean>) => 
    typeof modifiers === 'string' 
      ? cn(blockName, modifiers.split(' ').map(m => `${blockName}--${m}`))
      : cn(blockName, Object.entries(modifiers || {}).reduce((acc, [key, value]) => {
          if (value) acc[`${blockName}--${key}`] = value;
          return acc;
        }, {})),
  
  bemElClassName: (element: string, modifiers?: string | Record<string, boolean>) => 
    typeof modifiers === 'string'
      ? cn(`${blockName}__${element}`, modifiers.split(' ').map(m => `${blockName}__${element}--${m}`))
      : cn(`${blockName}__${element}`, Object.entries(modifiers || {}).reduce((acc, [key, value]) => {
          if (value) acc[`${blockName}__${element}--${key}`] = value;
          return acc;
        }, {}))
});