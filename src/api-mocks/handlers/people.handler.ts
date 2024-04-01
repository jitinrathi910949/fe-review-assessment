import { rest } from "msw";

import { API_RESOURCE } from "../../app/shared/constant";
import { PEOPLE } from "../fixtures";
import { delayedResponse } from "../utils";
import { SORT } from "@/app/modules/people/query";

const BASE_URL = `/mock-api/${API_RESOURCE.PEOPLE}*`;

export const getPeople = rest.get(BASE_URL, (_req, _res, ctx) => {
  const url = new URL(_req.url);
  const offset = Number(url.searchParams.get("offset"));
  const count = Number(url.searchParams.get("count"));
  const sort = url.searchParams.get("sort");
  const searchText = url.searchParams.get('search');
  const isAscending = sort === SORT.ASC;

  const totalPage = Math.ceil(PEOPLE.length / count);
  const totalCount = PEOPLE.length;
  const fromSlice = count * (offset - 1);
  const toSlice = count * offset;
  let peopleData = PEOPLE;

  if(searchText) {
    
    peopleData = peopleData.filter(person => person.name.includes(searchText));
  }

  peopleData = peopleData.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    if (nameA < nameB) {
      return isAscending ? -1 : 1;
    }
    if (nameA > nameB) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });

  const result =
    offset <= totalPage ? peopleData.slice(fromSlice, toSlice) : [];

  return delayedResponse(
    ctx.status(200),
    ctx.json({ result, totalPage, offset: offset, totalCount })
  );
});

export const handlers = [getPeople];
