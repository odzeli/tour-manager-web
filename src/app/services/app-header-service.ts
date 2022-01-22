import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class AppHeaderService {
  private data = new BehaviorSubject(null);

  setData(data) { this.data.next(data) }
  selectData() { return this.data.asObservable() }
}
