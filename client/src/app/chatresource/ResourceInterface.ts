import Resource from "./domain/Resource"
import { Observable } from "rxjs/Observable"

export default interface ResourceInterface {
    getItem(item: Resource): Observable<Resource>
    getItems(): Observable<Resource[]>
}