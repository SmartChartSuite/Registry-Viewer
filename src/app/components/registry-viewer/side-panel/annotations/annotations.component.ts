import { Component, OnInit } from '@angular/core';
import {Annotation} from "../../../../model/annotation";



@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {

  dataSource = ANNOTATION_DATA;
  columnsToDisplay = ['updated'];
  isAddAnnotationInputVisible = false;
  annotationList = ANNOTATION_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
const ANNOTATION_DATA: Annotation[] = [
  {
    position: 1,
    updated: "2022-11-05T02:03:00Z",
    textValue: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
    expanded: false
  },
  {
    position: 2,
    updated: "2022-12-05T02:03:00Z",
    textValue: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
    expanded: false
  },
  {
    position: 3,
    updated: "2023-01-05T02:03:00Z",
    textValue: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
    expanded: false
  },
  {
    position: 4,
    updated: "2023-12-05T02:03:00Z",
    textValue: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
    expanded: false
  },
  {
    position: 5,
    updated: "2022-11-10T02:03:00Z",
    textValue: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
    expanded: false
  },
  {
    position: 5,
    updated: "2022-11-10T02:03:00Z",
    textValue: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
    expanded: false
  },
  {
    position: 5,
    updated: "2022-11-10T02:03:00Z",
    textValue: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
    expanded: false
  },
  {
    position: 5,
    updated: "2022-11-10T02:03:00Z",
    textValue: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
    expanded: false
  }
];
