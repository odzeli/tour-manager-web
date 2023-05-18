import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploaderComponent } from 'src/app/common-components/file-uploader/file-uploader.component';

@Component({
  selector: 'app-import-process',
  templateUrl: './import-process.component.html',
  styleUrls: ['./import-process.component.scss']
})
export class ImportProcessComponent implements OnInit {

  isLinear = true;

  @ViewChild(FileUploaderComponent) uploaderComponent:FileUploaderComponent;

  firstFormGroup = this.formBuilder.group({
    fileUploader: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  importExcelFile(){
    this.uploaderComponent.importExcelFile();
  }

}
