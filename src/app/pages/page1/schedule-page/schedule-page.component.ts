import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '../../schedule.service';
import { MatDialog } from '@angular/material/dialog';
import { ISchedule } from 'src/app/interfaces/ISchedule';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';
import { SessionService } from '../../session.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from 'src/app/interfaces/ISession';
import { waitForAsync } from '@angular/core/testing';
import { DataTimePipe } from 'src/app/pipes/data-time.pipe';

export interface ITime
{
  start:Date;
  end:Date;
}

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})

export class SchedulePageComponent implements OnInit {
  protected _buttonAddmessege:boolean = false;
  public isNonDisable:boolean = true;
  public isEdit:boolean = false;

  protected allData:string[] =[];
  protected allTypeData:Date[] =[];
  protected _type: string[] = [
    "Лекционное занятие",
    "Практическое занятие",
    "Лаб. занятие",
    "Зачёт",
    "ДЗ", 
    "Экзамен", 
    "КР",
    "другое",
  ];
  private _dayOfWeek : string[] = ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  private _week: string[]=["Чётная", "Нечётная", "Экзамен/зачёт и т.д."]
  protected _time:ITime[]=
  [
    {start:new Date(0,0,0,7,45), end:new Date(0,0,0,9,20)},
    {start:new Date(0,0,0,9,40), end:new Date(0,0,0,11,15)},
    {start:new Date(0,0,0,11,35), end:new Date(0,0,0,13,10)},
    {start:new Date(0,0,0,13,40), end:new Date(0,0,0,15,15)},
    {start:new Date(0,0,0,15,35), end:new Date(0,0,0,17,10)},
    {start:new Date(0,0,0,17,30), end:new Date(0,0,0,19,5)},
    {start:new Date(0,0,0,19,25), end:new Date(0,0,0,21,0)},
  ];

  protected session: ISession= {id:0,dataStartSemester:"",dataEndSemester:"",dataStartSession:""};
  protected schedule: ISchedule[]=[];
  protected _shedule:ISchedule={id:0,name:"",type:"",teacher:"",time:"",place:"",week:"",data:""};
  protected getCurrentSchedule(value:Date, time:ITime)
  {
    this._shedule = this.findScheduleByDate(value,time);
  }

  public sessionForm = new FormGroup({
    dataStartSemester: new FormControl('',[Validators.required]),
    dataEndSemester: new FormControl('',[Validators.required]),
    dataStartSession:new FormControl('',[Validators.required]),
  });

  public get dataStartSemester():FormControl
  {
    return this.sessionForm.get("dataStartSemester") as FormControl;
  }
  public get dataEndSemester():FormControl
  {
    return this.sessionForm.get("dataEndSemester") as FormControl;
  }
  public get dataStartSession():FormControl
  {
    return this.sessionForm.get("dataStartSession") as FormControl;
  }
  public dataTimePipe:DataTimePipe = new DataTimePipe();
  constructor(public scheduleService: ScheduleService, public sessionService: SessionService,public dialog: MatDialog)
  {
   
  }
  
  async ngOnInit()
  {
    await this.scheduleService.getSchedules();

    await this.sessionService.getSessions();
    this.getScreenSize();

    
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if(window.innerWidth<1270)
    {
      this._buttonAddmessege = true
    }
    else
    {
      this._buttonAddmessege = false;
    }
  }
  add()
  {
    const dialogRef = this.dialog.open(ScheduleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scheduleService.add(result).subscribe();
      }
    });
  }
  edit(schedule:ISchedule)
  {
    const dialogRef = this.dialog.open(ScheduleDialogComponent,{data: schedule});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scheduleService.edit(result).subscribe();
      }
    });
  }
  remove(id:number):void
  {
    this.scheduleService.remove(id);
  }


  addSession()
  {
    if(this.sessionForm.invalid) return;
    if (this.session.dataEndSemester=="") {
      this.session=
      {
        id:0,
        dataStartSemester: this.dataTimePipe.transform(this.dataStartSemester.value),
        dataEndSemester: this.dataTimePipe.transform(this.dataEndSemester.value),
        dataStartSession: this.dataTimePipe.transform(this.dataStartSession.value)
      }  
      this.sessionService.add(this.session).subscribe();
    }
    else
    {
      this.session=
      {
        id:this.session.id,
        dataStartSemester: this.dataTimePipe.transform(this.dataStartSemester.value),
        dataEndSemester: this.dataTimePipe.transform(this.dataEndSemester.value),
        dataStartSession: this.dataTimePipe.transform(this.dataStartSession.value)
      }  
      this.sessionService.edit(this.session).subscribe();
    }
    
    this.isNonDisable=false;
    this.isEdit = false
  }
  editSession()
  {
    this.isNonDisable = true;
    this.isEdit = true;

    this.dataStartSemester.setValue(this.session.dataStartSemester);
    this.dataEndSemester.setValue(this.session.dataEndSemester);
    this.dataStartSession.setValue(this.session.dataStartSession);
  }
  close()
  {
    this.isNonDisable=false;
    this.isEdit = false
  }
  changeToFalse(value:ISession)
  {
    //присваивание и вызов функций здесь потому что ngInit отказывается записывать расписание и сессию пользователя
    this.session = value;
    this.scheduleService.schedules.subscribe(r=>{this.schedule = r});
    this.dateGenerate();

    
    let qtOfDaysFromYear:number = Math.floor((+(new Date())-(+this.stringToDate(this.session.dataStartSemester)))/(1000*60*60*24));
    
    const div = document.querySelector('div.schedule')
    div?.scrollTo({top:0, left:qtOfDaysFromYear*168,behavior: "smooth"})

    this.isNonDisable = false;
  }
  changeToTrue()
  {
    this.isNonDisable = true;
  }

  public stringToDate(value:string):Date
  {
    let month:number = +(value.toString().charAt(0)+value.toString().charAt(1))-1;
    let day:number = +(value.toString().charAt(3)+value.toString().charAt(4));
    let year:number = +(value.toString().charAt(6)+value.toString().charAt(7)
    +value.toString().charAt(8)+value.toString().charAt(9));

    return new Date(year, month, day);
  }

  dateGenerate():string[]
  {
    let session:ISession={id:0,dataStartSemester:"",dataEndSemester:"",dataStartSession:""};
    this.allData = [];
    this.allTypeData =[];
    this.sessionService.sessions.subscribe(r=>{session = r[0];});

    var currentDate = this.stringToDate(session.dataStartSemester);    
    var endDate = this.stringToDate(session.dataEndSemester);
    
    while(currentDate <= endDate) 
    {  
      this.allData.push(this._dayOfWeek[currentDate.getDay()]+" "+currentDate.getDate().toString()+" "+(+(currentDate.getMonth()+1).toString()));
      this.allTypeData.push(new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()));
      currentDate = new Date(currentDate.setDate(currentDate.getDate()+1));
    }
    return this.allData;
  }
  findScheduleByDate(value:Date, time:ITime):ISchedule
  {
    let qtOfDaysFromYear:number = (+(value)-(+new Date(value.getFullYear(),0,1)))/(1000*60*60*24);
    let sessionStart:number = Math.floor((+(this.stringToDate(this.session.dataStartSession))-+value)/(1000*60*60*24));
    let allDataIndex = value.getDay();
    let hour: number;
    let minute: number;
    for (let index of this.schedule)
    {
      hour = +this.stringToTime(index.time).getHours().toString();
      minute = +this.stringToTime(index.time).getMinutes().toString();
      
      if(index.week === this._week[2])
      {
        
        if(value.getDate().toString()===this.stringToDate(index.data).getDate().toString()&&
        value.getMonth().toString()===this.stringToDate(index.data).getMonth().toString() && 

        ((+time.start.getHours().toString()<hour||
         +time.start.getHours().toString()===hour&&+time.start.getMinutes().toString()<=minute) &&

        (+time.end.getHours().toString()>hour|| 
        +time.end.getHours().toString()===hour&&+time.end.getMinutes().toString()>=minute)))
        {
          return index;
        }
      }
      else
      {
        if (allDataIndex === +index.data && Math.floor(qtOfDaysFromYear/7) %2=== this._week.indexOf(index.week) && sessionStart>0&&
        ((+time.start.getHours().toString()<hour||
        +time.start.getHours().toString()===hour&&+time.start.getMinutes().toString()<=minute) &&
        (+time.end.getHours().toString()>hour|| 
        +time.end.getHours().toString()===hour&&+time.end.getMinutes().toString()>=minute)))
        {
          return index;
        }
      }
    }
    return {id:0,name:"",type:"",teacher:"",time:"",place:"",week:"",data:""};
  }

  stringToTime(value:string):Date
  {
    let hour = +(value.toString().charAt(0)+value.toString().charAt(1));
    let minute = +(value.toString().charAt(3)+value.toString().charAt(4));
    return new Date(0,0,0,hour,minute);
  }
}
