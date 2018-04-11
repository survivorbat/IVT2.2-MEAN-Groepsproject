import ResourceInterface from "../ResourceInterface";

export default class ResourceCommand {
    command: string;
    resourceinterface: ResourceInterface;

	constructor(command: string, resourceinterface: ResourceInterface) {
        this.command=command
        this.resourceinterface=resourceinterface
	}
    
}