import Resource from "./domain/Resource";
import { Observable } from "rxjs/Observable";

export default interface ResourceInterface {
    searchItem(item: String): Observable<Resource>;
    getItem(item: Resource): Observable<Resource>;
    getItems(): Observable<Resource[]>;
}