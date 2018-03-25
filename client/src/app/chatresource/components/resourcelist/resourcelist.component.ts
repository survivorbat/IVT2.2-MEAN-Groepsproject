import { Component, OnInit } from '@angular/core';
import { ChatresourceService } from '../../services/chatresource.service';
import Resource from '../../domain/Resource';

@Component({
  selector: 'app-resourcelist',
  templateUrl: './resourcelist.component.html',
  styleUrls: ['./resourcelist.component.scss']
})
export class ResourcelistComponent implements OnInit {

  private _resources: Resource[];
  private _error: string;

  constructor(private chatresourceservice: ChatresourceService) { }

	public get resources(): Resource[] {
		return this._resources;
	}

	public set resources(value: Resource[]) {
		this._resources = value;
	}

	public get error(): string {
		return this._error;
	}

	public set error(value: string) {
		this._error = value;
	}


  ngOnInit() {
    this.getResources();
  }

  getResources(): void{
    this.chatresourceservice.getItems().subscribe(res => this.resources=res, err => this.error="Error bij het ophalen van resources")
  }

  deleteResource(title: string){
    this.chatresourceservice.deleteItem(title);
  }

}
