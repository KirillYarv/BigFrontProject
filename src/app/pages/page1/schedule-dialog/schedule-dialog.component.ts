import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../../schedule.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ISchedule } from 'src/app/interfaces/ISchedule';
import { DataTimePipe } from 'src/app/pipes/data-time.pipe';

interface IType
{
  value: string;
  viewValue: string;
}
interface IWeek
{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent 
{
  private _dayOfWeek : string[] = ['Воскресенье','Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  private _type: IType[] = 
  [
    {value: "lection-0", viewValue:"Лекционное занятие"},
    {value: "seminar-1", viewValue:"Практическое занятие"},
    {value: "laba-2", viewValue:"Лаб. занятие"},
    {value: "test-3", viewValue:"Зачёт"},
    {value: "DC-4", viewValue:"ДЗ"}, 
    {value: "exam-5", viewValue:"Экзамен"}, 
    {value: "course_work-6", viewValue:"КР"},
    {value: "dr-7", viewValue:"другое"},
  ];
  private _week: IWeek[]=
  [
    {value: "even-0",viewValue:"Чётная"},
    {value: "uneven-1",viewValue:"Нечётная"},
    {value: "non-2",viewValue:"Экзамен/зачёт и т.д."}
  ]

  public isNonDisable:boolean = false;

  public get types() { return this._type;}
  public get weeks() { return this._week;}
  public get dayOfWeek() { return this._dayOfWeek;}

  private _buttonMessege: string = "";
  public get buttonMessege(){return this._buttonMessege;}

  private _titleMessege: string = "";
  public get titleMessege(){return this._titleMessege;}
  private dataTimePipe:DataTimePipe = new DataTimePipe();
  
  constructor(private scheduleService: ScheduleService,public dialog: MatDialogRef<ScheduleDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: ISchedule,){}

  public scheduleForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    time:new FormControl('',[Validators.required]),
    place:new FormControl('',[Validators.required]),
    teacher:new FormControl('',[Validators.required]),
    week:new FormControl('',[Validators.required]),
    data_s:new FormControl('',[Validators.required])
  });
  public get name():FormControl
  {
    return this.scheduleForm.get("name") as FormControl;
  }
  public get type():FormControl
  {
    return this.scheduleForm.get("type") as FormControl;
  }
  public get time():FormControl
  {
    return this.scheduleForm.get("time") as FormControl;
  }
  public get place():FormControl
  {
    return this.scheduleForm.get("place") as FormControl;
  }
  public get teacher():FormControl
  {
    return this.scheduleForm.get("teacher") as FormControl;
  }
  public get week():FormControl
  {
    return this.scheduleForm.get("week") as FormControl;
  }
  public get data_s():FormControl
  {
    return this.scheduleForm.get("data_s") as FormControl;
  }
  ngOnInit(): void 
  {
    if (this.data)
    {
      this.name.setValue(this.data.name);
      this.type.setValue(this.data.type);
      this.time.setValue(this.data.time);
      this.place.setValue(this.data.place);
      this.teacher.setValue(this.data.teacher);
      this.week.setValue(this.data.week);
      
      this._buttonMessege = "Изменить";
      this._titleMessege ="Изменение";
    }
    else
    {
      this._buttonMessege = "Добавить";
      this._titleMessege ="Добавление";
    }
  }
  add()
  {
    if(this.scheduleForm.invalid) return;

    let __data:string = this.data_s.value;
    
    if(!this.isNonDisable) 
      __data = this.dayOfWeek.indexOf(this.data_s.value)+"";
    else
      __data = this.dataTimePipe.transform(this.data_s.value);

    if (this.data)
    {
      this.data = {
        id: this.data.id,
        name: this.name.value,
        type: this.type.value,
        time: this.time.value,
        place: this.place.value,
        teacher: this.teacher.value,
        week: this.week.value,
        data: this.data_s.value
      }
      
      this.dialog.close(this.data);    
    }
    else
    {
      this.data = {
        id: 0,
        name: this.name.value,
        type: this.type.value,
        time: this.time.value,
        place: this.place.value,
        teacher: this.teacher.value,
        week: this.week.value,
        data: __data
      }
  
      this.dialog.close(this.data);
    }
  }
  public close()
  {
    this.dialog.close();
  }
  public handleChange()
  { 
    if(this.week.value == this._week[2].viewValue)
      this.isNonDisable = true;
    else
      this.isNonDisable = false;

  }
}
