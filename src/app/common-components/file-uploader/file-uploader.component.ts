import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImportService } from 'src/app/services/api/import-service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  fileName: string;
  requiredFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
  uploadProgress: number;
  uploadSub: Subscription;
  formData: FormData;

  constructor(
    private importService: ImportService
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.formData = new FormData();
      this.formData.append("uploadedFile", file);
      console.log(this.fileName);
    }
  }

  importExcelFile(): void {
    this.uploadSub = this.importService.uploadFile(this.formData)
      .pipe(
        finalize(() => this.reset())
      )
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      });
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}
