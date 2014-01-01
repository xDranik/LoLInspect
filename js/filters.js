var app = angular.module('app.filters', [])

//slice to unemptySlice
app.filter('slice', function() {
  return function(arr, start, end, championFilter) {
   championFilter = championFilter || '';
   return championFilter == '' ? [] : arr.slice(start, end);
  };
});