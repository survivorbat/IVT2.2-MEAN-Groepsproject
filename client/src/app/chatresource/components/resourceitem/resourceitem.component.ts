import { Component, OnInit, Input } from '@angular/core';
import { ChatresourceService } from '../../services/chatresource.service';
import Resource from '../../domain/Resource';

@Component({
  selector: 'app-resourceitem',
  templateUrl: './resourceitem.component.html',
  styleUrls: ['./resourceitem.component.scss']
})
export class ResourceitemComponent implements OnInit {
  @Input() resourceId: number;

  private resource: Resource;
  private error: string;

  constructor(private chatresourceservice: ChatresourceService) { }

  ngOnInit() {
    this.getResource();
  }

  getResource(): void{
    this.chatresourceservice.getItem(this.resourceId).subscribe(res => this.resource=res, err => this.error="Error bij het ophalen van resource")
  }
}
