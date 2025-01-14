export class LlmResponse{
  query: Query;
  interpretedResults: InterpretedResults;
  constructor(result: any) {
    console.log(result);
    this.interpretedResults = new InterpretedResults(result[0]);
    this.query = new Query(result[1]);

  }

}

class InterpretedResults {
  dbResult: any | any[];
  resultInterpretation: string;
  constructor(result: any) {
    this.dbResult = result.data.db_result;
    this.resultInterpretation = result.response.result_interpretation;
  }
}

class  Query {
  codes: any;
  sql: string;
  constructor(result: any){
    this.codes = result.codes;
    this.sql = result.omop_sql;
  }
}
