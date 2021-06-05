const getHostName = (url: string) => {
  if (!url) return '';

  var match =
    url &&
    url.match(
      /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
    );
    
  return (match && match[3]) || '';
};


export {
    getHostName
}