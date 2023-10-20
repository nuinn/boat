const origin = [{name: 'John', weight: 100},{name: 'Sam', weight: 60},{name: 'Mary', weight: 40}];
// const destination = [{name: 'Matt', weight: 90},{name: 'Malcolm', weight: 70},{name: 'Ben', weight: 70},{name: 'Steve', weight: 30},{name: 'Anna', weight: 20},{name: 'Steph', weight: 10}];
// const destination = [{name: 'Fatty', weight: 120}];
function river(
  origin,
  destination = [],
  capacity = 100,
  isBoatAtOrigin = true,
){
  function isDestinationEmpty(){
    if (destination[0]){
      return false;
    }
    else{
      return true;
    }
  }
  function isOriginEmpty(){
    if (origin[0]){
      return false;
    }
    else{
      return true;
    }
  }
  function lightestFirst(arr){
    arr = arr.sort(function (p1, p2) {
      if (p1.weight > p2.weight) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  function heaviestFirst(arr){
    arr = arr.sort(function (p1, p2) {
      if (p1.weight < p2.weight) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  if (isDestinationEmpty() && !isBoatAtOrigin){
    console.log('The boat is stranded!');
    return;
  }
  for (const person of origin){
    if (person.weight > capacity){
      console.log("We're gonna need a bigger boat!");
      return;
    }
  }
  let boatCapacity = capacity;
  lightestFirst(origin);
  for (let i = 1; !isOriginEmpty(); i++) {
    let trip = '';
    if (origin.length >= 2){
      switch (true){
        case (((origin[0].weight+origin[1].weight) <= capacity) && isBoatAtOrigin):
          lightestFirst(origin);
          for (let j = 0; j < origin.length; j++) {
            if (boatCapacity >= origin[0].weight){
              trip += `${origin[0].name} and `;
              boatCapacity -= origin[0].weight;
              destination.push(origin.shift());
              j--;
            }
          }
          trip = `Trip ${i}: ${trip.slice(0, -4)}to destination.`;
          console.log(trip);
          isBoatAtOrigin = false;
          boatCapacity = capacity;
          trip = '';
          break;

        case (!isBoatAtOrigin):
          lightestFirst(destination);
          if (boatCapacity >= destination[0].weight){
            trip = `Trip ${i}: ${destination[0].name} to origin.`;
            origin.push(destination.shift());
            lightestFirst(origin);
            console.log(trip);
            isBoatAtOrigin = true;
            trip = '';
          }
          else{
            console.log('Someone at the destination needs to lose some weight first!');
            return;
          }
          break;

        case (isBoatAtOrigin):
          heaviestFirst(origin);
          for (let k = 0; k < origin.length; k++) {
            if (boatCapacity >= origin[0].weight){
              trip += `${origin[0].name} and `;
              boatCapacity -= origin[0].weight;
              destination.push(origin.shift());
              lightestFirst(origin);
              k--;
            }
          }
          trip = `Trip ${i}: ${trip.slice(0, -4)}to destination.`;
          console.log(trip);
          isBoatAtOrigin = false;
          boatCapacity = capacity;
          trip = '';
          break;
      }
    }
    else{
      switch (true){
        case (!isBoatAtOrigin):
          lightestFirst(destination);
          if (boatCapacity >= destination[0].weight){
            trip = `Trip ${i}: ${destination[0].name} to origin.`;
            origin.push(destination.shift());
            lightestFirst(origin);
            console.log(trip);
            isBoatAtOrigin = true;
            trip = '';
          }
          else{
            console.log('Someone at the destination needs to lose some weight first!');
            return;
          }
          break;

        case (isBoatAtOrigin):
          heaviestFirst(origin);
          for (let k = 0; k < origin.length; k++) {
            if (boatCapacity >= origin[0].weight){
              trip += `${origin[0].name} and `;
              boatCapacity -= origin[0].weight;
              destination.push(origin.shift());
              lightestFirst(origin);
              k--;
            }
          }
          trip = `Trip ${i}: ${trip.slice(0, -4)}to destination.`;
          console.log(trip);
          isBoatAtOrigin = false;
          boatCapacity = capacity;
          trip = '';
          break;
      }
    }
  }
}

river(origin,[],100,true);