import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model:ElementRef;
  studentObj: Student=new Student();
  studentList: Student[]=[];
  editMode:boolean=false;

  ngOnInit(): void {
      console.log("onit called");
      const fetchLocalStorage=localStorage.getItem('angularCRUD');
      if(fetchLocalStorage){
        this.studentList=JSON.parse(fetchLocalStorage);
      }
      console.log(this.studentList);
      
  }
  updateData(){
    const currentRecord=this.studentList.find(m=>m.id===this.studentObj.id);
    if(currentRecord!=undefined){
      currentRecord.name=this.studentObj.name;
      currentRecord.address=this.studentObj.address;
      currentRecord.mobileNo=this.studentObj.mobileNo;
      currentRecord.city=this.studentObj.city;
      currentRecord.state=this.studentObj.state;
      currentRecord.pincode=this.studentObj.pincode;
      currentRecord.email=this.studentObj.email;
    }
    localStorage.setItem('angularCRUD',JSON.stringify(this.studentList));
    this.onClose();
  }

  AddData(){
    // this.editMode=false;
    const model=document.getElementById("myModal");
    if(model){
      model.style.display='block';
    }
  }
  onEdit(item:Student){
    this.editMode = true;
    this.studentObj = { ...item }; // Create a shallow copy of the item
    this.AddData();
  }
  onDelete(item:Student){
    const confirmDelete = confirm("Are you sure to remove the record?");
    if (confirmDelete) {
      this.studentList = this.studentList.filter(student => student.id !== item.id);
      localStorage.setItem('angularCRUD', JSON.stringify(this.studentList));
    }
  }

  onClose(){
    this.studentObj=new Student();
    if(this.model){
      this.model.nativeElement.style.display='none';
    }

  }

  onSave(){
    const localIsPresent=localStorage.getItem('angularCRUD');
    if(localIsPresent!=null){
      const oldArr=JSON.parse(localIsPresent);
      this.studentObj.id=oldArr.length+1;
      oldArr.push(this.studentObj);
      localStorage.setItem('angularCRUD',JSON.stringify(oldArr));
      this.studentList=oldArr;
    }else{
      const newArr=[];
      this.studentObj.id=1;
      newArr.push(this.studentObj);
      localStorage.setItem('angularCRUD',JSON.stringify(newArr));
      this.studentList=newArr;
    }
    this.onClose();
  }


}

export class Student{
  id:number;
  name:string;
  mobileNo:string;
  email:string;
  city:string;
  state:string;
  pincode:string;
  address:string;

  constructor(){
    this.id=0;
    this.address='';
    this.city='';
    this.state='';
    this.pincode='';
    this.name='';
    this.mobileNo='';
    this.email='';
  }
}
