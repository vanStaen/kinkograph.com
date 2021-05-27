
  export function capitalizeFirstLetter(string) {
      if (string === undefined || string === null) {
          return null;
      }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }