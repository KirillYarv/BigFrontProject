import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataTime'
})
export class DataTimePipe implements PipeTransform {

  transform(data: string, ...args: unknown[]): string 
  {

    let normalized: string ="";
    let month :string[] = ["Jan","Feb","Mar","Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    if (data.toString().length>25) 
    {
      let a = month.indexOf(data.toString().charAt(4)+data.toString().charAt(5)+data.toString().charAt(6))+1;
      if(a<10)
        normalized += "0"+a+" ";
      else
        normalized += a+" ";
      
      for (let i = 8; i < 15; i++) {
        normalized+=data.toString().charAt(i);
      }
    }
    else
    {
      for (let i = 5; i < 10; i++) {
        if (data.toString().charAt(i)=="-")
          normalized+=" ";
        else
          normalized+=data.toString().charAt(i);
      }
      normalized+=" "+data.toString().charAt(0)+data.toString().charAt(1)+data.toString().charAt(2)+data.toString().charAt(3);
    }
    return normalized
  }

}
