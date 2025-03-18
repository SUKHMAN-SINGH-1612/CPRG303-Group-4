import supabase from './supabase'

const TABLE_NAME = 'sampledatabase';

export async function getAnimals (){
  const { data, error } = await supabase.from(TABLE_NAME).select('*');
  if (error) {
    throw error;
  }
  console.log("data: ", data)
  return data;
}
