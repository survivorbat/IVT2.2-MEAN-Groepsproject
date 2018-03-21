import Resource from "./domain/Resource";

export default interface ResourceInterface {
    searchItem(item: String): Resource;
    getItem(item: Resource): Resource;
    getItems(): Resource[];
}