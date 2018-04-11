import { Component, OnInit, Input } from '@angular/core';
import { ChatresourceService } from '../../services/chatresource.service';
import Resource from '../../domain/Resource';

@Component({
  selector: 'app-resourceitem',
  templateUrl: './resourceitem.component.html',
  styleUrls: ['./resourceitem.component.scss']
})
export class ResourceitemComponent implements OnInit {
  @Input() resourceString: string;

  private resource: Resource;
  private error: string;

  constructor(private chatresourceservice: ChatresourceService) { }

  ngOnInit() {
    if (this.resourceString) {
      this.resource = JSON.parse(this.resourceString)
    }
  }
}
