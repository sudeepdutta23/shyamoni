import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpitAroundCommaService {

  constructor() { }

  spaceBetween = (data: any) =>{
    let commaseperated = data?.replaceAll(',',' , ')
    return commaseperated
  }
}
