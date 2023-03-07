import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formData!: FormGroup;

  constructor() { }

  setFormData(data: FormGroup): void {
    this.formData = data;
  }

  getFormData(): FormGroup {
    return this.formData;
  }

  formPromise(){
    return new Promise(resolve => {
      setTimeout(() =>{
        resolve(this.formData)
      },200)
    })
  }
}
