export interface DateMatchStage {
  [key: string]: {
    $gte?: Date;
    $lte?: Date;
  };
}
